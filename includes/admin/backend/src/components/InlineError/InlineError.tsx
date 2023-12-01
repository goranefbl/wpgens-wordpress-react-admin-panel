type InlineErrorProps = {
	error: string | null;
};
export default function InlineError({ error }: InlineErrorProps) {
	return error ? <div className='px-4 py-2 border border-red-500 text-red-500 bg-red-50 rounded-md mb-4'>{error}</div> : null;
}
