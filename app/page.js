import Slider from '@/components/Slider';
import Link from 'next/link';
import slider_data from '../data/slider_data.json'


export default function Home() {
  return (
    <>
    <Slider data={slider_data}></Slider>
    </>
  );
}
