import { ConteineStars } from "./Stars.styled"

export const Stars = ({qtyStars}: {qtyStars: number}) => {

    function handleStarsColor(positionStar: number) {
        if(qtyStars >= positionStar) {
            return 'color'
        } 
        if(qtyStars < positionStar && (positionStar - 1) + 0.5 <= qtyStars && (positionStar - 1) + 0.9 >= qtyStars) {
            return 'halfColor'
        }
    }

  return (
    <ConteineStars>
        <div className={handleStarsColor(1) === 'color' ? 'color' : handleStarsColor(1) === 'halfColor' ? 'halfColor' : 'star'}>★</div>
        <div className={handleStarsColor(2) === 'color' ? 'color' : handleStarsColor(2) === 'halfColor' ? 'halfColor' : 'star'}>★</div>
        <div className={handleStarsColor(3) === 'color' ? 'color' : handleStarsColor(3) === 'halfColor' ? 'halfColor' : 'star'}>★</div>
        <div className={handleStarsColor(4) === 'color' ? 'color' : handleStarsColor(4) === 'halfColor' ? 'halfColor' : 'star'}>★</div>
        <div className={handleStarsColor(5) === 'color' ? 'color' : handleStarsColor(5) === 'halfColor' ? 'halfColor' : 'star'}>★</div>
    </ConteineStars>
  )
}
