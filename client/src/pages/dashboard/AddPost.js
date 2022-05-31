import React from 'react'
import Wrapper from '../../assets/wrappers/DashboardFormPage'
import { Alert, FormRow } from '../../components'
import { useAppContext } from '../../context/appContext'



const AddPost = () => {

  const { isEditing,
    editPost,
    showAlert,
    displayAlert,
    nameProduct,
    locationPost,
    descriptionPost,
    imgPost,
    changeBy, handleChange, clearValues, createPost } = useAppContext()

    const handleSubmit = (e) => {
      e.preventDefault()
      if(!nameProduct || !locationPost){
        displayAlert();
        return
      }
     
      if (isEditing) {
          editPost();
        return
      }
      createPost()
    }

  const handlePostInput = (e) => {
    handleChange({ name: e.target.name, value: e.target.value })
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit post' : 'add post'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          <FormRow type="text" labelText="Name Product" name="nameProduct" value={nameProduct} handleChange={handlePostInput} />
          <FormRow type="text" labelText="Description" name="descriptionPost" value={descriptionPost} handleChange={handlePostInput} />
          <FormRow type="text" labelText="Location" name="locationPost" value={locationPost} handleChange={handlePostInput} />
          <FormRow type="text" labelText="Imagen" name="imgPost" value={imgPost} handleChange={handlePostInput} />
          <FormRow type="text" name="changeBy" value={changeBy} handleChange={handlePostInput} />

          <div className='btn-container'>
            <button type='submit' className='btn btn-block submit-btn' onClick={handleSubmit}>submit</button>

            <button className='btn btn-block clear-btn' onClick={(e) => {
                e.preventDefault()
                clearValues()
              }}>
              clear
            </button>

          </div>
        </div>
      </form>


    </Wrapper>
  )
}

export default AddPost
