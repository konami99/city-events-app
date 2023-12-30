'use client';

import { MdChevronLeft, MdChevronRight } from 'react-icons/md'

export function ChevronLeft() {
    const slideLeft = () => {
        var slider = document.getElementById('slider');
        slider!.scrollLeft = slider!.scrollLeft - 500;
    }

    return <MdChevronLeft size={40} onClick={slideLeft} />
}

export function ChevronRight() {
    const slideRight = () => {
        var slider = document.getElementById('slider');
        slider!.scrollLeft = slider!.scrollLeft + 500;
    }

    return <MdChevronRight size={40} onClick={slideRight} />
}