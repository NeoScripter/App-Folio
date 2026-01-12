import { Button } from '@/components/auth/form/button';
import { Anchor } from '@/components/user/ui/anchor';
import FluidImage from '@/components/user/ui/fluid-image';
import { ProjectType } from '@/lib/types/projects';
import { useDeleteModal } from '@/providers/delete-modal-context';
import { locale } from '@/signals/locale';
import { FC } from 'preact/compat';

const ProjectCard: FC<{ project: ProjectType }> = ({ project }) => {
    const { itemToDelete } = useDeleteModal();
    return (
        <li className="max-w-140 text-base">
            <h3 class="mb-3 font-bold">{project.attributes.title.en}</h3>
            <div className="mb-4">{project.attributes.description.en}</div>
            {project.image && (
                <FluidImage
                    parentClass="max-w-100 aspect-video w-full mb-6 shrink-0 rounded-xl"
                    alt={project.image.alt[locale.value]}
                    tiny={project.image.tiny}
                    dkWebp={project.image.tbWebp}
                    dkAvif={project.image.tbAvif}
                    tbWebp={project.image.tbWebp}
                    tbAvif={project.image.tbAvif}
                    mbWebp={project.image.mbWebp}
                    mbAvif={project.image.mbAvif}
                />
            )}

            <div class="flex items-center gap-2">
                <Anchor
                    href={`/projects/${project.attributes.slug}`}
                    class="text-sm"
                    variant="primary"
                >
                    Edit
                </Anchor>
                <Button
                    class="rounded-xl"
                    onClick={() => (itemToDelete.value = project)}
                    variant="destructive"
                >
                    Delete
                </Button>
            </div>
        </li>
    );
};

export default ProjectCard;

export const ProjectCardSkeleton = () => {
    return (
        <li className="w-full list-none max-w-140 text-base">
            <h3 class="skeleton mb-3 w-fit rounded-sm font-bold">
                Lorem ipsum dolor sit
            </h3>
            <div className="skeleton mb-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Aut
                nostrum consequatur quas suscipit possimus temporibus! Quis
                molestias minima illum accusantium! Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Tempora, earum!
            </div>
            <div class="skeleton w-100 aspect-video mb-6 shrink-0 rounded-xl" />

            <div class="flex items-center gap-2">
                <div class="w-fit skeleton rounded-xl px-3 py-1">Loremmm</div>
                <div class="w-fit skeleton rounded-xl px-3 py-1">Loremmm</div>
            </div>
        </li>
    );
};
