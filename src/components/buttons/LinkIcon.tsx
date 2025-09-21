import { Icon } from "@iconify/react"
import { IconButton, Tooltip } from "@mui/material"
import Link from "next/link"


const LinkIcon = ({title, href, icon, color, placement = 'top', target = '_blank'}: any) => {
  
  return <>
    <Tooltip arrow title={title} placement={placement}>
      <IconButton href={href} LinkComponent={Link} target={target}>
        <Icon icon={icon} style={{ color }} />
      </IconButton>
   </Tooltip>
  </>
}

export default LinkIcon;
