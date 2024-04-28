import style from './input.module.css'

export default ({text, event, id, isPassword, ...props}) => (
    <>
        <div className={isPassword ? [style.input_box, style.password].join(' '): style.input_box}>
            <input 
                id = {id} 
                required 
                maxLength={20} 
                autoComplete='off' 
                onChange = {(e) => {event(e.target.value)}}
                {...props}
                />
            <label htmlFor=''>{text}</label>
        </div>
    </>
)

export const ButtonBox = ({text}) => (
    <div className={style.button_box}>
        <button type = 'submit'>{text}</button>
    </div>
)