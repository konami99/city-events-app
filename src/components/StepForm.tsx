'use client'

import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { Editor as TinyMCEEditor } from 'tinymce';
import { useEffect, useState, useTransition } from "react";
import { motion } from 'framer-motion';
import { z } from 'zod';
import { FormDataSchema } from "@/lib/schema";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm, SubmitHandler } from 'react-hook-form';
import Event from "@/components/Event";
import Dropzone from '@/components/Dropzone';
import { toHTML } from '@portabletext/to-html'
import { FileType } from '@/lib/helpers';
import { ValidFieldNames } from '@/lib/schema';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

type Inputs = z.infer<typeof FormDataSchema>

const steps = [
    {
        id: 'Step 1',
        name: 'Event Info',
        fields: ['title', 'shortDescription', 'description', 'mainImage']
    },
    {
        id: 'Step 2',
        name: 'More Event Info',
        fields: ['startDate', 'endDate', 'eventOrganiser']
    },
    { id: 'Step 3', name: 'Complete' }
]

export default function StepForm({ event, action }: { event: Event, action: Function }) {
    const [previousStep, setPreviousStep] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);
    const [isPending, startTransition] = useTransition();
    const editorRef = useRef<TinyMCEEditor | null>(null);
    const [files, setFiles] = useState<FileType[]>([])
    const descriptionInHtml = event.descriptionRaw._key === '' ? '' : toHTML(event.descriptionRaw);
    const delta = currentStep - previousStep;
    const [endDate, setEndDate] = useState(new Date(event.endDate));
    const [startDate, setStartDate] = useState(new Date(event.startDate));

    const {
        register,
        handleSubmit,
        watch,
        reset,
        trigger,
        setValue,
        getValues,
        setError,
        formState: { errors }
    } = useForm<Inputs>({
        resolver: zodResolver(FormDataSchema)
    })

    const processForm: SubmitHandler<Inputs> = data => {
        startTransition(async () => {
            const formData = new FormData()
            formData.append('file', files[0])

            

            const response: { errors: string } = await action(event._id, data, formData);

            if (response === undefined) {
                files.forEach(file => URL.revokeObjectURL(file.preview))
                reset();
            } else {
                const fieldErrorMapping: Record<string, ValidFieldNames> = {
                    title: "title",
                    shortDescription: "shortDescription",
                    description: "description",
                    startDate: "startDate",
                    endDate: "endDate",
                    eventOrganiser: "eventOrganiser",
                };

                const errorArray = Object.entries(response.errors);
                
                errorArray.forEach(([field, messages]) => {
                    setError(fieldErrorMapping[field], {
                        type: "server",
                        message: messages[0],
                    });
                })
            }
        });
    }

    type FieldName = keyof Inputs;

    const next = async () => {
        const fields = steps[currentStep].fields

        /*
        if (currentStep === 0) {
            setValue('description', editorRef.current!.getContent({ format: 'html' }));
        }
        */

        const output = await trigger(fields as FieldName[], { shouldFocus: true })

        if (!output) return

        if (currentStep < steps.length - 1) {
            if (currentStep === steps.length - 2) {
                await handleSubmit(processForm)()
            }
            setPreviousStep(currentStep)
            setCurrentStep(step => step + 1)
        }
    }
    
    const prev = () => {
        if (currentStep > 0) {
            setPreviousStep(currentStep)
            setCurrentStep(step => step - 1)
        }
    }
    

    useEffect(() => {
        setValue('description', event.descriptionRaw._key === '' ? '' : toHTML(event.descriptionRaw));
    }, [])

    useEffect(() => {
        setValue('endDate', endDate);
        setValue('startDate', startDate);

        if (event.mainImage.asset.url.length > 0) {
            fetch(event.mainImage.asset.url)
                .then(response => response.blob())
                .then(blob => {
                    const f = new File([blob], "mainImage");
                    const url = URL.createObjectURL(f);
                    setFiles([
                        Object.assign(f, { preview: url })
                    ])
                })
        }
    }, [])

    const handleEndDateChange = (date: Date) => {
        setValue('endDate', date);
        setEndDate(date);
    }

    const handleStartDateChange = (date: Date) => {
        setValue('startDate', date);
        setStartDate(date);
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <ul className="steps">
                {steps.map((step, index) => (
                    currentStep > index ? (
                        <li key={index} className="step step-primary">{step.name}</li>
                    ) : currentStep === index ? (
                        <li key={index} className="step step-primary">{step.name}</li>
                    ) : (
                        <li key={index} className="step">{step.name}</li>
                    )
                ))}
            </ul>

            {/* Form */}
            <form className='grid grid-cols-6 gap-4 container' onSubmit={handleSubmit(processForm)}>
                {currentStep === 0 && (
                    <div className='grid md:col-start-2 md:gap-4 md:col-span-4 mx-2 gap-2 col-span-6 col-start-1'>
                        <motion.div
                            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <h2 className='text-base font-semibold leading-7 text-gray-900'>
                            Event Information
                            </h2>
                            <p className='mt-1 text-sm leading-6 text-gray-600'>
                            Provide event details.
                            </p>

                            <div>
                                <div className='col-span-full'>
                                    <label
                                    htmlFor='mainImage'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                    >
                                    Main Image
                                    </label>

                                    <Dropzone className={ 'mt-10 border border-neutral-200 p-16' } files={files} setFiles={setFiles} />
                                </div>
                                
                                <div className='col-span-full'>
                                    <label
                                    htmlFor='title'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                    >
                                    Title
                                    </label>
                                    <div className='mt-2'>
                                    <input
                                        type='text'
                                        id='title'
                                        {...register('title')}
                                        defaultValue={ event.title }
                                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                    />
                                    {errors.title?.message && (
                                        <p className='mt-2 text-sm text-red-400'>
                                        {errors.title.message}
                                        </p>
                                    )}
                                    </div>
                                </div>

                                <div className='col-span-full'>
                                    <label
                                    htmlFor='shortDescription'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                    >
                                    Short Description
                                    </label>
                                    <div className='mt-2'>
                                    <input
                                        type='text'
                                        id='shortDescription'
                                        defaultValue={ event.shortDescription }
                                        {...register('shortDescription')}
                                        className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                    />
                                    {errors.shortDescription?.message && (
                                        <p className='mt-2 text-sm text-red-400'>
                                        {errors.shortDescription.message}
                                        </p>
                                    )}
                                    </div>
                                </div>

                                <div className='col-span-full'>
                                    <div className='mt-2'>
                                        <input id='description' style={{display: 'none'}} {...register('description')} />
                                        <Editor
                                            id='richtexteditor'
                                            apiKey='dd5142xewbx5sf8qfurvteyk3iebaz1rru58zmgaz1kug0bq'
                                            onInit={(evt, editor) => editorRef.current = editor}
                                            init={{
                                                    toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
                                                    tinycomments_mode: 'embedded',
                                                    tinycomments_author: 'Author name',
                                                    mergetags_list: [
                                                    { value: 'First.Name', title: 'First Name' },
                                                    { value: 'Email', title: 'Email' },
                                                ],
                                            }}
                                            //initialValue={ descriptionInHtml }
                                            value={ getValues('description') }
                                            
                                            onEditorChange={(newValue, editor) => {
                                                
                                                setValue("description", newValue, { shouldValidate: true })
                                            }}
                                            
                                        />
                                        {errors.description?.message && (
                                            <p className='mt-2 text-sm text-red-400'>
                                            {errors.description.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {currentStep === 1 && (
                    <div className='grid md:col-start-2 md:gap-4 md:col-span-4 mx-2 gap-2 col-span-6 col-start-1'>
                        <motion.div
                            initial={{ x: delta >= 0 ? '50%' : '-50%', opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            <h2 className='text-base font-semibold leading-7 text-gray-900'>
                            More Event Details
                            </h2>
                            <p className='mt-1 text-sm leading-6 text-gray-600'>
                            More event details.
                            </p>

                            <div>
                                <div>
                                    <label
                                    htmlFor='startDate'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                    >
                                    Start Date
                                    </label>
                                    <div>
                                        <input
                                            type='text'
                                            id='startDate'
                                            style={{display: 'none'}}
                                            {...register('startDate')}
                                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                        />
                                        <DatePicker showTimeSelect dateFormat="MMMM d, yyyy h:mm aa" selected={startDate} onChange={handleStartDateChange} />
                                        {errors.startDate?.message && (
                                            <p className='mt-2 text-sm text-red-400'>
                                            {errors.startDate.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label
                                    htmlFor='endDate'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                    >
                                    End Date
                                    </label>
                                    <div>
                                        <input
                                            type='text'
                                            id='endDate'
                                            style={{display: 'none'}}
                                            {...register('endDate')}
                                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                        />
                                        <DatePicker showTimeSelect dateFormat="MMMM d, yyyy h:mm aa" selected={endDate} onChange={handleEndDateChange} />
                                        {errors.endDate?.message && (
                                            <p className='mt-2 text-sm text-red-400'>
                                            {errors.endDate.message}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label
                                    htmlFor='eventOrganiser'
                                    className='block text-sm font-medium leading-6 text-gray-900'
                                    >
                                    Event Organiser
                                    </label>
                                    <div>
                                        <input
                                            type='text'
                                            id='eventOrganiser'
                                            defaultValue={event.eventOrganiser}
                                            {...register('eventOrganiser')}
                                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-sky-600 sm:text-sm sm:leading-6'
                                        />
                                        {errors.eventOrganiser?.message && (
                                            <p className='mt-2 text-sm text-red-400'>
                                            {errors.eventOrganiser.message}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

                {currentStep === 2 && (
                <>
                    <h2 className='text-base font-semibold leading-7 text-gray-900'>
                    Complete
                    </h2>
                    <p className='mt-1 text-sm leading-6 text-gray-600'>
                    Thank you for your submission.
                    </p>
                </>
                )}
            </form>

            {/* Navigation */}
            <div className='my-8 pt-5'>
                <div className='flex justify-between'>
                    <button
                        type='button'
                        onClick={prev}
                        disabled={currentStep === 0}
                        className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                        <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='h-6 w-6'
                        >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M15.75 19.5L8.25 12l7.5-7.5'
                        />
                        </svg>
                    </button>
                    <button
                        type='button'
                        onClick={next}
                        disabled={currentStep === steps.length - 1}
                        className='rounded bg-white px-2 py-1 text-sm font-semibold text-sky-900 shadow-sm ring-1 ring-inset ring-sky-300 hover:bg-sky-50 disabled:cursor-not-allowed disabled:opacity-50'
                    >
                        <svg
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 24 24'
                        strokeWidth='1.5'
                        stroke='currentColor'
                        className='h-6 w-6'
                        >
                        <path
                            strokeLinecap='round'
                            strokeLinejoin='round'
                            d='M8.25 4.5l7.5 7.5-7.5 7.5'
                        />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    )
}