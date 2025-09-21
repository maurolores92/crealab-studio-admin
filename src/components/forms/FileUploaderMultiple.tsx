

// MUI Imports
import List from '@mui/material/List'
import Avatar from '@mui/material/Avatar'
import ListItem from '@mui/material/ListItem'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'

// Third-party Imports
import { useDropzone } from 'react-dropzone'
import { Box } from '@mui/system'
import { Icon } from '@iconify/react'
import Link from 'next/link'

type FileProp = {
  name: string
  type: string
  size: number
}

const FileUploaderMultiple = ({files, setFiles}: any) => {

  // Hooks
  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles: File[]) => {
      const fileList = acceptedFiles.map((file: File) => Object.assign(file));
      setFiles([...files, ...fileList]);
    }
  })

  const renderFilePreview = (file: FileProp) => {
    if (file.type.startsWith('image')) {
      return <img width={38} height={38} alt={file.name} src={URL.createObjectURL(file as any)} />
    } else {
      return <i className='tabler-file-description' />
    }
  }

  const handleRemoveFile = (file: FileProp) => {
    const uploadedFiles = files
    const filtered = uploadedFiles.filter((i: FileProp) => i.name !== file.name)

    setFiles([...filtered])
  }

  const fileList = files.map((file: FileProp, index: any) => (
    <ListItem key={index}>
      <Box className='file-details'>
        <div className='file-preview'>{renderFilePreview(file)}</div>
        <div>
          <Typography className='file-name'>{file.name}</Typography>
          <Typography className='file-size' variant='body2'>
            {Math.round(file.size / 100) / 10 > 1000
              ? `${(Math.round(file.size / 100) / 10000).toFixed(1)} mb`
              : `${(Math.round(file.size / 100) / 10).toFixed(1)} kb`}
          </Typography>
        </div>
      </Box>
      <IconButton onClick={() => handleRemoveFile(file)}>
        <Icon icon='tabler:x' />
      </IconButton>
    </ListItem>
  ))

  return (
    <>
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <Box className='flex items-center flex-col' sx={{textAlign: 'center'}}>
          <Avatar variant='rounded' className='bs-12 is-12 mbe-9' sx={{margin: 'auto'}}>
            <Icon icon='tabler:upload' />
          </Avatar>
          <Typography variant='h5' className='mbe-2.5'>
            Arrastra para cargar imagen
          </Typography>
          <Typography>
            Suelte los archivos aquí o haga clic en{' '}
            <Link href='/' onClick={e => e.preventDefault()} className='text-textPrimary no-underline'>
              examinar
            </Link>{' '}
            en su máquina
          </Typography>
        </Box>
      </div>
      {files.length ? (
        <>
          <List>{fileList}</List>
        </>
      ) : null}
    </>
  )
}

export default FileUploaderMultiple