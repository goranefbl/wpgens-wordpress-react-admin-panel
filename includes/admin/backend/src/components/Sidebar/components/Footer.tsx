export default function Footer() {
	return (
		<div className='my-16 mx-7 flex flex-col items-center'>
			<p className='text-center myt-4 text-sm'>
				Need help?
				<br />
				Please check our docs.
			</p>
			<a href='https://example.com' target='_blank' className='underline hover:text-white hover:no-underline mb-4' rel='noreferrer'>
				Documentation
			</a>

			<a href='https://wpgens.com/#about' target='_blank' className='underline hover:text-white hover:no-underline' rel='noreferrer'>
				WordPress Service
			</a>
		</div>
	);
}
