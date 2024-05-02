import React from 'react'

export default function POSRadios(props) {
  const {selectedCategory} = props;

  const handleSelectedCategory = (e)=>{
    const {value} = e.target;
    props.handleSelectedCategory(value)
  }
  return (
    <div className="radio-button">
      <input type="radio" value="" id="all" name="category" checked={selectedCategory===""} onChange={handleSelectedCategory}/>
      <label className='card' htmlFor="all">All</label>
      <input type="radio" value="Rice Meal" id="RiceMeal" name="category"  checked={selectedCategory==="Rice Meal"} onChange={handleSelectedCategory}/>
      <label className='card'  htmlFor="RiceMeal">RiceMeal</label>
      <input type="radio" value="Desserts & Drinks" id="DesertsDrinks" name="category" checked={selectedCategory==="Desserts & Drinks"} onChange={handleSelectedCategory}/>
      <label className='card'  htmlFor="DesertsDrinks">Deserts & Drinks</label>
      <input type="radio" value="Pastas" id="Pastas" name="category" checked={selectedCategory==="Pastas"} onChange={handleSelectedCategory}/>
      <label className='card'  htmlFor="Pastas">Pastas</label>
      <input type="radio" value="Burgers & Fries" id="BurgersFries" name="category" checked={selectedCategory==="Burgers & Fries"} onChange={handleSelectedCategory}/>
      <label className='card'  htmlFor="BurgersFries">Burgers & Fries</label>
    </div>
  )
}
