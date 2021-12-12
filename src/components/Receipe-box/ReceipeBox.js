import React from "react";
import style from './ReceipeBox.css';

const ReceipeBox = ({title,calories,image,ingredients}) =>{
	return(
		<div className={style.recipeBox} style={{"borderRadius": "30px","margin":"10px","boxShadow": "rgba(0, 0, 0, 0.25) 0px 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px"}}>
			<h1>{title}</h1>
			<ol>
				{ingredients.map(ingredient=>(
					<li>{ingredient.text}</li>
				))}
			</ol>
			
<p>Calories : {calories}</p>

			<img className={style.image} src={image} alt=""/>

		</div>
	);

}
export default ReceipeBox;
