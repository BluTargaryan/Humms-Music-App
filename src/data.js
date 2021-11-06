import { v4 as uuidv4 } from 'uuid';

function chillHop() {
    return [
        {
            name: "Perfect Storm",
            artist: "Aviino",
            cover: "https://i.scdn.co/image/ab67616d0000b2735ee8016d725358bfac550120",
            id: uuidv4(),
            active: true,
            color: ['#AD6144', '#4C6876'],
            audio: "https://mp3.chillhop.com/serve.php/?mp3=23057"
        },
        {
            name: "I Thought Graduating Would Feel Weirder",
            artist: "Sleepy Fish",
            cover: "https://i.scdn.co/image/ab67616d0000b273949e1c9ca070c4d9759da347",
            id: uuidv4(),
            active: false,
            color: ['#AD6144', '#4C6876'],
            audio: "https://mp3.chillhop.com/serve.php/?mp3=24827"
        },
        {
            name: "Made A Way",
            artist: "Travis Greene",
            cover: "https://m.media-amazon.com/images/I/717JP77VlPL._SS500_.jpg",
            id: uuidv4(),
            active: false,
            color: ['#854B59', '#F6FAFB'],
            audio: "https://www.justgospel.com.ng/Tag/datas//Travis-Greene-Made-A-Way.mp3?_=3"
        },
        {
            name: "We Gon' Be Alright",
            artist: "Tye Tribbett",
            cover: "https://images.genius.com/3e094efd70116fe70579f9b765c6dd2e.1000x1000x1.jpg",
            id: uuidv4(),
            active: false,
            color: ['#BFBFBF', '#3B3B3B'],
            audio: "https://www.xclusivepop.com/wp-content/uploads/2020/09/Tye_Tribbett_-_We_Gon_Be_Alright.mp3"
        },
        {
            name: "Charmander",
            artist: "Amine",
            cover: "https://i1.wp.com/360media.com.ng/wp-content/uploads/2021/10/images-4-1.jpeg?fit=554%2C554&ssl=1",
            id: uuidv4(),
            active: false,
            color: ['#C07654', '#4D2ABF'],
            audio: "https://360media.com.ng/wp-content/uploads/2021/10/Amin_-_Charmander_360media.com.ng.mp3?_=2"
        }
    ];
}

export default chillHop;