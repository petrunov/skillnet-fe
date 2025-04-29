'use client';
import { BottomNavigation, BottomNavigationAction } from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import BusinessIcon from '@mui/icons-material/Business';
import PersonIcon from '@mui/icons-material/Person';
import type { Translations } from '../../../i18n/dictionaries';

export default function MobileBottomNav({ dict }: { dict: Translations }) {
  return (
    <BottomNavigation
      showLabels
      value={2}
      sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
      <BottomNavigationAction
        label={dict.login.executors}
        icon={<GroupIcon />}
      />
      <BottomNavigationAction
        label={dict.login.companies}
        icon={<BusinessIcon />}
      />
      <BottomNavigationAction label={dict.login.login} icon={<PersonIcon />} />
    </BottomNavigation>
  );
}
