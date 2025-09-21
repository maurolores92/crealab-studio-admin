
import {  Typography, Card, CardContent, CardHeader, styled, } from "@mui/material"
import { DateTime } from "luxon";
import MuiTimeline from '@mui/lab/Timeline'
import { 
  TimelineDotProps, TimelineItem, TimelineSeparator, 
  TimelineDot, TimelineConnector, TimelineContent
} from '@mui/lab'

const Timeline = styled(MuiTimeline)<TimelineDotProps>({
  paddingLeft: 0,
  paddingRight: 0,
  '& .MuiTimelineItem-root': {
    width: '100%',
    '&:before': {
      display: 'none'
    }
  }
});

const CardHistoryContainer = styled('div')({
  maxHeight: '300px',
  overflowY: 'auto'
})

const TimeItem = ({item}: any) => {
  const today = DateTime.now().toFormat('yyyy-MM-dd');
  const date = DateTime.fromISO(item.createdAt).toFormat('yyyy-MM-dd');
  let showDate = DateTime.fromISO(item.createdAt).toFormat('yyyy-MM-dd');
  if(today === date) {
    showDate =  DateTime.fromISO(item.createdAt).toFormat('hh:mm a')
  }
  
  return <>
    <TimelineItem>
        <TimelineSeparator>
          <TimelineDot color={item.color} />
          <TimelineConnector />
        </TimelineSeparator>
        <TimelineContent>
          <div className='flex flex-wrap items-center justify-between gap-x-2 mbe-2.5'>
            <Typography fontWeight={600} className='font-medium' color='text.primary'>
              {item.title}
            </Typography>
            <Typography variant='caption'>{showDate}</Typography>
          </div>
          <Typography>  {item.description}</Typography>
        </TimelineContent>
      </TimelineItem>
  </>
}

const HistoryCard = ({history}: any) => {

  return <>
    <Card sx={{mb: 2}}>
      <CardHeader title='Historial' />
      <CardContent>
        <CardHistoryContainer>
        <Timeline>
          {
            history.map((item: any, index: number) => 
            <TimeItem item={item} key={index} />)
          }
        </Timeline>
        </CardHistoryContainer>
      </CardContent>
    </Card>
  </>
}

export default HistoryCard