import { Perk, perks } from '@/lib/data/perks';
import { locale } from '@/signals/locale';
import { cn } from '@/utils/cn';
import { FC } from 'preact/compat';

const Perks = () => {
    return (
        <div className="mt-16 mb-13 sm:my-19 lg:mb-23">
            <ul
                className={cn(
                    'grid gap-10 sm:grid-cols-2 md:py-5 lg:py-8 xl:py-12 lg:grid-cols-3 sm:gap-x-8 sm:gap-y-15 lg:gap-x-28 lg:gap-y-17 xl:gap-x-32 xl:gap-y-30',
                )}
            >
                {perks.map((perk) => (
                    <PerkCard key={perk.id} perk={perk} />
                ))}
            </ul>
        </div>
    );
};

export default Perks;

const PerkCard: FC<{ perk: Perk }> = ({ perk }) => {
    const lang = locale.value === 'ru' ? 'Ru' : 'En';

    return (
        <li>
            <perk.icon strokeWidth={1.5} class="mb-3 size-8 mx-auto sm:ml-0 sm:mb-4.5 lg:mb-6 xl:mb-7 xl:size-12" />
            <p class="text-center mx-auto max-w-110 sm:max-w-full sm:mx-0 text-balance sm:text-left">{perk[`description${lang}`]}</p>
        </li>
    );
};
