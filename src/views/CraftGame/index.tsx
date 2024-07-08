import { useEffect, useState } from 'react';

import CupIcon from 'src/assets/images/cup-icon.png';
import OvenIcon from 'src/assets/images/oven-icon.png';
import WineIcon from 'src/assets/images/wine-icon.png';
import GrapeIcon from 'src/assets/images/grape-icon.png';
import WheatIcon from 'src/assets/images/wheat-icon.png';
import ChocolateIcon from 'src/assets/images/chocolate-icon.png';
import ChocolateCookieIcon from 'src/assets/images/chocolate-cookie-icon.png';
import './style.css';

type Material = {
  name: string;
  image: string;
};

type Recipe = {
  name: string;
  image: string;
  materials: string[];
}

const materialList: Material[] = [
  { name: '밀', image: WheatIcon },
  { name: '포도', image: GrapeIcon },
  { name: '초콜릿', image: ChocolateIcon },
  { name: '오븐', image: OvenIcon },
  { name: '컵', image: CupIcon },
]

const initMaterialList: (Material | null)[] = [null, null, null, null, null, null, null, null, null];

const recipeList: Recipe[] = [
  { name: '초코쿠키', image: ChocolateCookieIcon, materials: ['밀', '초콜릿', '오븐'] },
  { name: '와인', image: WineIcon, materials: ['컵', '포도'] },
];

export default function CraftGame() {

  const [craftMaterialItems, setCraftMaterialItems] = useState<(Material | null)[]>(initMaterialList);
  const [result, setResult] = useState<Recipe | null>(null);

  const onMaterialItemClickHandler = (item: Material) => {
    const newCraftMaterialItems = [...craftMaterialItems];
    for (let index = 0; index < newCraftMaterialItems.length; index++) {
      if (!newCraftMaterialItems[index]) {
        newCraftMaterialItems[index] = item;
        break;
      }
    }
    setCraftMaterialItems(newCraftMaterialItems);
  };

  const onResetClickHandler = () => {
    setCraftMaterialItems(initMaterialList);
    setResult(null);
  }

  const findRecipe = (recipeList: Recipe[]) => {
    for (const recipe of recipeList) {
      let find = true;
      for (const material of recipe.materials) {
        const exist = craftMaterialItems.some(item => item?.name === material);
        if (!exist) {
          find = false;
          break;
        }
      }
      if (find) setResult(recipe);
    }
  }

  useEffect(() => {
    findRecipe(recipeList);
  }, [craftMaterialItems]);

  return (
    <div id='craft-wrapper'>
      <div className='side-item-list'>
        {materialList.map(item => (
          <div className='material-item' onClick={() => onMaterialItemClickHandler(item)}>
            <div className='material-item-image' style={{ backgroundImage: `url(${item.image})` }}></div>
            <div className='material-item-name'>{item.name}</div>
          </div>
        ))}
      </div>
      <div className='craft-container'>
        <div className='craft-info'>
          <div className='craft-message'>Crafting...</div>
          <div className='reset-button' onClick={onResetClickHandler}></div>
        </div>
        <div className='craft-box'>
          <div className='craft-material-box'>
            {craftMaterialItems.map(item =>
              item ?
                <div className='craft-material-item' style={{ backgroundImage: `url(${item.image})` }}></div>
                :
                <div className='craft-material-item'></div>
            )}
          </div>
          <div className='arrow-icon'></div>
          <div className='craft-result-box' style={{ backgroundImage: `url(${result ? result.image : ''})` }}></div>
        </div>
      </div>
    </div>
  )
}
