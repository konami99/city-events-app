'use client'

import { useState } from "react";

interface EditPageProps {
    params: {
        slug: string,
    }
}

const steps = [
    {
        id: 'Step 1',
        name: 'Personal Info',
        fields: ['firstName', 'lastName', 'email']
    },
    {
        id: 'Step 2',
        name: 'Address',
        fields: ['country', 'state', 'city', 'street', 'zip']
    },
    { id: 'Step 3', name: 'Complete' }
]

export default async function EventPage({
    params: { slug }
}: EditPageProps) {

    const [previousStep, setPreviousStep] = useState(0)
    const [currentStep, setCurrentStep] = useState(0)
    const delta = currentStep - previousStep

    return (
        <div className="flex justify-center items-center">
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
        </div>
    )
}