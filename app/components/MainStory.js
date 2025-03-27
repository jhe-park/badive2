import MainSectionHeader from './MainSectionHeader'

const MainStory = () => {
  const THUMBNAILS = [
    {
      img: '/story/thumbnail1.png',
      link: 'https://youtu.be/q5rGiEZLdA8?si=Rm8x6v2SnY1pg_F-',
    },
    {
      img: '/story/thumbnail2.png',
      link: 'https://youtu.be/zzZoKMPZeqY?si=qIWaqK7hjF1xOd8r',
    },
    {
      img: '/story/thumbnail3.png',
      link: 'https://www.youtube.com/@badive_official',
    },
    {
      img: '/story/thumbnail4.png',
      link: 'https://www.youtube.com/@badive_official',
    },
  ]
  return (
    <section className='bg-white'>
      <MainSectionHeader title='BADIVE DIVING STORY' />
      <div className='grid grid-cols-2 sm:grid-cols-4 w-full'>
        {THUMBNAILS.map((item) => (<a key={item.img} href={item.link} target='_blank'>
          <img alt={item.img} src={item.img} />
        </a>))}
      </div>
    </section>
  )
}
export default MainStory