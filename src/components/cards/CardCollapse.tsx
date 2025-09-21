import { Card, CardHeader, Collapse, IconButton, useMediaQuery, useTheme } from "@mui/material";

import { Icon } from "@iconify/react";
import { useState } from "react";

const CardCollapse = ({title, action, children, isCollapsed = true}: any) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [collapsed, setCollapsed] = useState<boolean>(!isMobile || isCollapsed);

  return <Card sx={{mb: 2}}>
    <CardHeader 
      title={title} 
      sx={{px: {lg: 3, xs: 3}, pt: 3, pb: 2}} 
      action={<>
        {action}
        <IconButton
          size='small'
          aria-label='collapse'
          sx={{ color: 'text.secondary', ml: 1 }}
          onClick={() => setCollapsed(!collapsed)}
        >
          <Icon fontSize={20} icon={!collapsed ? 'tabler:chevron-down' : 'tabler:chevron-up'} />
        </IconButton>
      </>}/>
    <Collapse in={collapsed}>
      {children}
    </Collapse>
  </Card>
}

export default CardCollapse