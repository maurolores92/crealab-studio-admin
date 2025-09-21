import React from 'react';
import CustomChip from 'src/@core/components/mui/chip';

interface StatusChipProps {
  isActive: boolean;
  activeLabel?: string;
  inactiveLabel?: string;
  activeColor?: 'primary' | 'warning' | 'info' | 'success' | 'error' | 'default' | 'secondary';
  inactiveColor?: 'primary' | 'warning' | 'info' | 'success' | 'error' | 'default' | 'secondary';
}

const StatusChip: React.FC<StatusChipProps> = ({
  isActive,
  activeLabel = 'Activo',
  inactiveLabel = 'Inactivo',
  activeColor = 'success',
  inactiveColor = 'error',
}) => {
  return (
    <CustomChip
      label={isActive ? activeLabel : inactiveLabel}
      skin='light'
      color={isActive ? activeColor : inactiveColor}
    />
  );
};

export default StatusChip;
