// ** Next Import
import { Box, BoxProps, styled } from '@mui/material'
import type { Theme } from '@mui/material/styles'
import dynamic from 'next/dynamic'

// ** Types
import { EditorProps } from 'react-draft-wysiwyg'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'


// Styled Components
const EditorWrapper = styled(Box)<BoxProps>(({ theme }: { theme: Theme }) => ({
  '& .rdw-editor-wrapper': {
    borderRadius: 4,
    border: `1px solid ${theme.palette.divider}`,
    '& .rdw-editor-toolbar': {
      border: 0,
      marginBottom: 0,
      background: theme.palette.background.paper,
     
      '& .rdw-fontsize-dropdown': {
        minWidth: 50
      },
      '& .rdw-link-modal': {
        height: 'auto'
      },
      '& .rdw-dropdown-selectedtext': {
        color: theme.palette.text.primary
      },
      '& .rdw-colorpicker-modal, & .rdw-link-modal, & .rdw-embedded-modal, & .rdw-emoji-modal, & .rdw-image-modal': {
        
        borderColor: theme.palette.divider,
        backgroundColor: theme.palette.background.paper
      },
      '& .rdw-dropdown-optionwrapper': {
       
        backgroundColor: theme.palette.background.paper,
        '& .rdw-dropdownoption-highlighted': {
          backgroundColor: theme.palette.action.hover
        },
        '& .rdw-dropdownoption-active': {
          backgroundColor: theme.palette.action.selected
        }
      },
      '& .rdw-option-wrapper, & .rdw-dropdown-wrapper': {
        borderRadius: 6,
        borderColor: theme.palette.divider,
        background: theme.palette.background.paper,
        '$ .rdw-option-active': {
          background: theme.palette.grey[200],
          boxShadow: 'none',
          border: '2px solid',
          borderRadius: 6,
           borderColor: theme.palette.divider,
        },
        '& .rdw-dropdown-carettoopen': {
          left: 'auto',
          right: '10%',
          borderTopColor: theme.palette.text.disabled
        },
        '& .rdw-dropdown-carettoclose': {
          left: 'auto',
          right: '10%',
          borderBottomColor: theme.palette.text.disabled
        },
        '[data-mui-color-scheme="dark"] & img': {
          filter: 'invert(1)'
        }
      },
      '& .rdw-embedded-modal-size-input, & .rdw-image-modal-size-input': {
        width: '60%',
        minHeight: 30
      },
      '& .rdw-link-modal-input, & .rdw-embedded-modal-link-input, & .rdw-image-modal-url-input': {
        minHeight: 38
      },
      '& .rdw-link-modal-input, & .rdw-embedded-modal-link-input, & .rdw-image-modal-url-input, & .rdw-embedded-modal-size-input, & .rdw-image-modal-size-input':
        {
          fontSize: '1rem',
          background: 'none',
          padding: theme.spacing(0, 3.5),
          color: theme.palette.text.primary,
          borderColor: theme.palette.divider,
          borderRadius: theme.shape.borderRadius,
          '&:focus': {
            borderColor: theme.palette.primary.main
          },
          '&::placeholder, &:-ms-input-placeholder, &::-ms-input-placeholder': {
            color: theme.palette.text.disabled
          }
        },
      '& .rdw-link-modal-btn, & .rdw-embedded-modal-btn, & .rdw-image-modal-btn': {
        border: 0,
        lineHeight: 1.71,
        borderRadius: '25px',
        letterSpacing: '0.3px',
        textTransform: 'uppercase',
        fontWeight: theme.typography.fontWeightMedium,
        '&:first-of-type:not([disabled])': {
          color: theme.palette.primary.contrastText,
          backgroundColor: theme.palette.primary.main,
          '&:hover': {
            boxShadow: theme.shadows[4],
            backgroundColor: theme.palette.primary.dark
          },
          '&:active': {
            boxShadow: theme.shadows[3]
          }
        },
        '&:last-child': {
          boxShadow: theme.shadows[3],
          color: theme.palette.secondary.contrastText,
          backgroundColor: theme.palette.secondary.main,
          '&:hover': {
            boxShadow: theme.shadows[4],
            backgroundColor: theme.palette.secondary.dark
          },
          '&:active': {
            boxShadow: theme.shadows[3]
          }
        },
        '&[disabled]': {
          cursor: 'default',
          boxShadow: 'none',
          color: theme.palette.text.disabled,
          backgroundColor: theme.palette.action.disabledBackground
        }
      }
    },
    '& .rdw-editor-main': {
      cursor: 'text',
      padding: '0 1rem',
      minHeight: '10rem',
      color: theme.palette.text.primary,

      ...(theme.direction === 'rtl'
        ? {
            '& .public-DraftStyleDefault-block': {
              direction: 'ltr !important',
              textAlign: 'left !important'
            }
          }
        : {})
    }
  }
}))

type Props = EditorProps & {
  boxProps?: BoxProps
}

// ! To avoid 'Window is not defined' error
const Editor = dynamic<EditorProps>(() => import('react-draft-wysiwyg').then(mod => mod.Editor), {
  ssr: false
})

const ReactDraftWysiwyg = (props: Props) => {
  const { boxProps, ...rest } = props

  return (
    <EditorWrapper {...boxProps}>
      <Editor {...rest} />
    </EditorWrapper>
  )
}
export default ReactDraftWysiwyg;

