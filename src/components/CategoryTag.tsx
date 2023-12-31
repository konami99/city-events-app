interface CategoryTagProps {
    name: string,
}

export default function CategoryTag({ name }: CategoryTagProps) {
    return <div className="badge badge-neutral">{name}</div>;
}