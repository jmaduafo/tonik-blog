export function registerBackground() {
    const background = [
        {
            id: 1,
            image: "https://res.cloudinary.com/dyxxn831a/image/upload/v1696452392/tonik/tonik4-crop_nym06f.gif"
        }, 
        {
            id: 2,
            image: "https://res.cloudinary.com/dyxxn831a/image/upload/v1696949478/tonik/tonik3_qufaro.gif"
        }, 
        {
            id: 3,
            image: "https://res.cloudinary.com/dyxxn831a/image/upload/v1696949509/tonik/tonik2_ccubgl.gif"
        }
        
    ]

    const date = new Date();

    if (+date.getDay() % background.length === 0) {
        return background[0]
    } else if (+date.getDay() % background.length === 1) {
        return background[1]
    } else if (+date.getDay() % background.length === 2) {
        return background[2]
    }
}