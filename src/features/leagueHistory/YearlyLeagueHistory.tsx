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
  const [loading, setLoading] = useState(true);
  const [standings, setStandings] = useState<StandingOverall[]>([]);
  const [showYearly, setShowYearly] = useState(false);
  const notify = useNotify();

  const fetchStandings = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/standings${year ? `?year=${year}` : ''}`);
      setStandings(response.data);
    } catch (error) {
      notify.showNotification({
        title: 'Error',
        message: 'Failed to load standings',
        color: 'red'
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStandings();
  }, [year]);

  const sortedStandings = useMemo(() => {
    return [...standings].sort((a, b) => b.points - a.points);
  }, [standings]);

  if (loading) {
    return <PageLoader />;
  }

  return (
    <Stack>
      <Group justify="space-between">
        <Text size="xl" weight={700}>
          League History {year && `(${year})`}
        </Text>
        <Switch
          label="Show Yearly Stats"
          checked={showYearly}
          onChange={(event) => setShowYearly(event.currentTarget.checked)}
        />
      </Group>

      <Card shadow="sm" padding="lg" radius="md" withBorder>
        {sortedStandings.length === 0 ? (
          <Text color="dimmed" align="center">
            No standings available
          </Text>
        ) : (
          <Stack>
            {sortedStandings.map((standing, index) => (
              <Group key={standing.playerId} justify="apart">
                <Group>
                  <div className="flex items-center gap-2">
                    {index === 0 && <MdMilitaryTech className="text-yellow-500 text-2xl" />}
                    {index === 1 && <MdEmojiEvents className="text-gray-400 text-xl" />}
                    <Text>{standing.playerName}</Text>
                  </div>
                </Group>
                <Text weight={500}>{standing.points} pts</Text>
              </Group>
            ))}
          </Stack>
        )}
      </Card>
    </Stack>
  );
};

export default YearlyLeagueHistory;
