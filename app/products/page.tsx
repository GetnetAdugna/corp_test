import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/shared/ui/button';
import Link from 'next/link';

export default async function Products() {
    return (
        <div className="w-full flex flex-col items-center fancy-overlay">
            <div className="mt-24 text-center min-h-[40vh]">
                <PageTitle>
                    Under Construction{' '}
                    <span role="img" aria-label="roadwork sign">
                        🚧
                    </span>
                </PageTitle>

                <p className="mt-4">
                    Oops, you've hit a page that doesn't seem to exist anymore.
                </p>

                <Button asChild className="mt-8">
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        </div>
    );
}