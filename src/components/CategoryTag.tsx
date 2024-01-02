interface CategoryTagProps {
    name: string,
}

export default function CategoryTag({ name }: CategoryTagProps) {
    return <span className="badge badge-neutral mr-[0.5rem]">{name}</span>;
}