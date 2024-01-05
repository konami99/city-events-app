'use client';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

export function ChevronLeft({ targetId }) {
    const slideLeft = () => {
        var slider = document.getElementById(targetId);
        slider!.scrollLeft = slider!.scrollLeft - 500;
    }

    return <MdChevronLeft className="opacity-50 cursor-pointer hover:opacity-100" size={30} onClick={slideLeft} />
}

export function ChevronRight({ targetId }) {
    const slideRight = () => {
        var slider = document.getElementById(targetId);
        slider!.scrollLeft = slider!.scrollLeft + 500;
    }

    return <MdChevronRight className="opacity-50 cursor-pointer hover:opacity-100" size={30} onClick={slideRight} />
}