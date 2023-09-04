export const YEAR = []
export const MONTH = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12 ]
export const DAY = []

for (let i=2023; i>=1923; i--) {
    YEAR.push(i)
}

for (let i=1; i<=31; i++) {
    DAY.push(i)
}

export const NOW_TREND = [
    {
        rank: 1,
        word: '잠실 하늘',
        retweet: 1300,
        desc: '',
        at: '대한민국'
    },
    {
        rank: 2,
        word: '#BIRTH_OF_COSMO',
        retweet: 257,
        desc: '회사를 Zola Zola 드디어 앤싸인 데뷔 웜홀 23.08.09. 6PM 가보자고 💛',
        at: 'Only on Twitter'
    },
    {
        rank: 3,
        word: '이번 태풍',
        retweet: 16335,
        desc: '',
        at: '대한민국'
    },
    {
        rank: 4,
        word: '잼버리 콘서트',
        retweet: 27866,
        desc: '',
        at: '세계'
    },
    {
        rank: 5,
        word: '말복 매직',
        retweet: 1528,
        desc: '',
        at: '대한민국'
    },
    {
        rank: 6,
        word: '재택 근무',
        retweet: 452,
        desc: '',
        at: '40대'
    },
    {
        rank: 7,
        word: '직장인 목숨 두개',
        retweet: 1977,
        desc: '',
        at: '30대 여성'
    }
]

export const NATION_CODE = [
    {
        code: 82,
        country: 'KOR',
        icon: '🇰🇷'
    },
    {
        code: 1,
        country: 'US',
        icon: '🇺🇸'
    },
    {
        code: 20,
        country: 'EG',
        icon: '🇪🇬'
    },
    {
        code: 33,
        country: 'FR',
        icon: '🇫🇷'
    },
    {
        code: 39,
        country: 'IT',
        icon: '🇮🇹'
    },
    {
        code: 44,
        country: 'UK',
        icon: '🇬🇧'
    },
    {
        code: 55,
        country: 'BR',
        icon: '🇧🇷'
    },
    {
        code: 60,
        country: 'MAL',
        icon: '🇺🇲'
    },
    {
        code: 977,
        country: 'NEP',
        icon: '🇳🇵'
    },
]