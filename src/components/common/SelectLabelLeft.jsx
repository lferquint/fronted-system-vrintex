import '../../assets/styles/common/SelectLabelLeft.css'
function SelectLabelLeft({options, labelText, objContentKey='content', objIdKey='id', optionValueIsId=false}){
    return (
        <div className="SelectLabelLeft" > 
            <label htmlFor="SelectLabelLeft">{labelText}</label>
            <select id="SelectLabelLeft">
                {   
                    options.map((option)=>{
                        return <option key={option[objIdKey]} value={ optionValueIsId ? option[objIdKey] : option[objContentKey]}> { option[objContentKey] } </option>
                    }) 
                } 
            </select>
        </div>
    )
}
export default SelectLabelLeft