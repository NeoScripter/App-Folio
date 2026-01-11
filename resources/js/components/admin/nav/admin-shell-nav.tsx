import { Anchor } from '@/components/user/ui/anchor';
import { FC } from 'preact/compat';

const AdminShellNav: FC<{ href: string }> = ({ href }) => {
    return (
        <nav class="mb-2">
            <Anchor href={href} variant="primary">
                Create New
            </Anchor>
        </nav>
    );
};

export default AdminShellNav;
