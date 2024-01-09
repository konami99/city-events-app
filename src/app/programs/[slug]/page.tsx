import { fetchPrograms } from "@/app/actions";

interface ProgramPageProps {
    params: {
        slug: string,
    }
}

export default async function ProgramPage({
    params: { slug }
}: ProgramPageProps) {
    const programs = await fetchPrograms({
        where: {
            slug: {
                current: {
                    eq: slug,
                },
            }
        }
    });

    const program = programs[0];
}