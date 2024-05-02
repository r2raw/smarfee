export default (str)=>{
        const words = str.split(' ');

        let acronym = '';
    
        words.forEach(word => {
            acronym += word.charAt(0);
        });
    
        return acronym.toUpperCase();
}