import BackStory1Tiny from '@/assets/images/about/backstory-1-tiny.webp';
import BackStory1 from '@/assets/images/about/backstory-1.webp';
import BackStory2Tiny from '@/assets/images/about/backstory-2-tiny.webp';
import BackStory2 from '@/assets/images/about/backstory-2.webp';

export type BackstoryItemType = {
    id: string;
    img: string;
    tinyImg: string;
    altRu: string;
    altEn: string;
    textRu: string;
    textEn: string;
};

export const backstoryItems = [
    {
        id: crypto.randomUUID(),
        img: BackStory1,
        tinyImg: BackStory1Tiny,
        altRu: 'lorem',
        altEn: 'lorem',
        textRu: '<p>Несколько лет назад я и не подозревал, что стану заниматься программированием. Тем не менее, мне всегда нравилось решать сложные задачи и изучать что-то новое. Долгое время я работал переводчиком английского и французского языков, но в какой-то момент я стал изучать программирование ради интереса.</p> <p>Первым моим языком программирования был Rust. Язык очень сложный, и я бы не советовал начинать изучение программирования с него. Тем не менее, таков был мой выбор, и после полугода многочасового чтения статей и руководств каждый день, а также выполнения практических заданий, я стал писать код на Rust. В какой-то момент я решил, что хочу заниматься программированием профессионально, и мой выбор упал на веб-программирование.</p>',
        textEn: '<p>A few years back, I never would’ve guessed I’d end up in programming. But I’ve always enjoyed taking on tough challenges and learning new things. I spent a lot of time working as an English and French translator, but eventually, my curiosity led me to explore programming.</p> <p> My first language was Rust, which is pretty difficult. I honestly wouldn’t recommend it if you’re just starting out, but that’s what I went with. I spent about six months reading articles and tutorials for hours each day, plus doing tons of practice exercises, before I felt confident writing Rust code. That’s when I realized I wanted to do this professionally and decided to focus on web development.</p>',
    },
    {
        id: crypto.randomUUID(),
        img: BackStory2,
        tinyImg: BackStory2Tiny,
        altRu: 'lorem',
        altEn: 'lorem',
        textRu: '<p>Я стал активно изучать и практиковать HTML, CSS и JavaScript. После Rust эти языки казались невероятно простыми, и я довольно быстро написал несколько простых сайтов и приложений буквально через пару недель после начала их изучения. Освоив базовые навыки, я создал портфолио и стал брать заказы в качестве фрилансера. В процессе работы я освоил серверный язык PHP и многие другие фреймворки и платформы. Я продолжаю регулярно изучать что-то новое в этой сфере и всегда стараюсь стать лучше. </p> <p> На данный момент я уже написал большое количество сайтов и приложений для клиентов, которые с удовольствием ими пользуются. В своей работе я руководствуюсь высокими стандартами и всегда стараюсь сделать максимально качественный продукт. Именно по этой причине я не работаю с конструкторами сайтов вроде Тильды, так как эти инструменты, по моему мнению, неспособны создать быстрый и производительный веб-сайт, который легко кастомизировать и поддерживать.</p>',
        textEn: '<p>So I started studying HTML, CSS, and JavaScript. Compared to Rust, they felt a lot easier. Within a few weeks, I was already building basic websites and apps. Once I got comfortable with those, I put together a portfolio and began taking on freelance jobs. Along the way, I also learned PHP and picked up various frameworks and platforms. I’m still constantly learning and trying to get better. </p> <p> Over time, I’ve built a wide range of websites and apps for clients who are happy with my work. I have high standards and always try to deliver the best possible product. That’s why I don’t use website builders like Tilda—I just don’t think they can produce sites that are as fast, efficient, and easy to maintain.</p>',
    },
];
