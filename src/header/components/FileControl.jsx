import React from 'react'
import { StyledButton } from '../../common/Button'

// const Button = styled.label`
//   align-items: center;
//   background-color: #5eb95e;
//   border-radius: 4px;
//   color: white;
//   cursor: pointer;
//   color: white;
//   font-size: 100%;
//   line-height: normal;
//   padding: 0.5em 1em;
//   text-align: center;
//   text-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
//   text-transform: uppercase;
//   user-select: none;
//   vertical-align: middle;
//   white-space: nowrap;
//   zoom: 1;
// `

function FileControl({ onFileLoaded }) {
  const handleChange = async (e) => {
    const fileDatas = await loadFiles(e)
    onFileLoaded(fileDatas)
  }

  const readFileAsync = (file) => {
    return new Promise((resolve, reject) => {
      let reader = new FileReader()

      reader.onload = () => {
        resolve(JSON.parse(reader.result))
      }

      reader.onerror = reject

      reader.readAsText(file)
    })
  }

  const loadFiles = async (fileEvent) => {
    const inputFiles = fileEvent.target.files

    if (inputFiles.length === 0) {
      return
    }

    const files = []
    for (let f = 0; f < inputFiles.length; f++) {
      const fileData = await readFileAsync(inputFiles[f])
      files.push({ name: inputFiles[f].name, fileData })
    }
    return files
  }
  return (
    <>
      <input
        type="file"
        id="upload-file"
        name="file"
        onChange={(e) => handleChange(e)}
        hidden
        multiple
      />
      <StyledButton htmlFor="upload-file" title={'Import Google Location data'}>
        Import
      </StyledButton>
    </>
  )
}

export default FileControl
