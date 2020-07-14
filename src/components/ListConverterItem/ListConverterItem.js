import React from 'react'
import classes from './ListConverterItem.module.css';

const ListConverterItem = (props) => {
  
  const {name, iso, checked} = props.rate;
  const {action, changeActive} = props;
  let check;
  
  if(checked) {
    check = (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" ><path d="M12 0C18.6289 0 24 5.37258 24 12L23.9962 12.305C23.8344 18.7929 18.5255 24 12 24L11.695 23.9962C5.20713 23.8344 0 18.5255 0 12L0.00379986 11.695C0.165607 5.20713 5.47454 0 12 0ZM18.2918 7.66519C17.9107 7.29876 17.292 7.29612 16.9121 7.6614L10 14.3077L7.09412 11.5136C6.70693 11.1413 6.09027 11.144 5.7082 11.5113L5.6918 11.5271C5.31071 11.8936 5.31126 12.4916 5.69523 12.8608L9.30477 16.3315C9.68723 16.6993 10.3095 16.7024 10.6913 16.3353L18.3087 9.01084C18.6902 8.64404 18.6903 8.04834 18.3082 7.68096L18.2918 7.66519Z" fill="#3F8AE0"></path></svg>
    )
  }

  return (
    <div className={classes.convertItem} onClick={() => {
      action(props.rate);
      changeActive();
    }}>
      <div className={classes.convertItem__info}>
        <div className={classes.convertItem__img}>
          <img src={`https://www.countryflags.io/${iso.slice(0, 2)}/flat/64.png`} />
        </div>
        <div className={classes.convertItem__text}>
          <p className={classes.convertItem__text__title}>{iso}</p>
          <p className={classes.convertItem__text__subtitle}>{name}</p>
        </div>
      </div>

      {check}
    </div>
  )
}

export default ListConverterItem;