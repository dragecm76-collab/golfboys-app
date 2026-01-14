import { Card, Group, Stack, Switch, Text } from '@mantine/core';
import { useNotify } from '@snoconedev/mantine-ui';
import React, { useEffect, useMemo, useState } from 'react'
import { MdEmojiEvents, MdMilitaryTech } from 'react-icons/md';
import { api } from '../../api';
import PageLoader from '../../components/PageLoader';
import { StandingOverall } from '../../types/Standing'

type Props = {
  year?: number;
}

const YearlyLeagueHistory = ({ year }: Props) => {
  // OVDJE DOLAZI PUNI KOD IZ OverallLeagueHistory.tsx
  // (useState, useEffect, useMemo, API pozivi, JSX...)
  
  return (
    <div>League History Loading...</div> // privremeno
  )
}

export default YearlyLeagueHistory
