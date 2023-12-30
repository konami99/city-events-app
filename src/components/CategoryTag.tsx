interface CategoryTagProps {
    name: string,
    className?: string,
}

export default function CategoryTag({ name, className }: CategoryTagProps) {
    return <span className="{`badge ${className}`}">name</span>;
}