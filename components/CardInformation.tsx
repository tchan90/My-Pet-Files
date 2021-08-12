import React, { FC } from 'react';
import { StyleSheet } from 'react-native';

import { Avatar, Card, Divider } from 'react-native-paper';

import SimpleInformation from '../components/SimpleInformation';
import ListInformation from '../components/ListInformation';
import DotInformation from '../components/DotInformation';

interface CardType {
  data: object | Array<string>;
  icon: string;
  title: string;
  type: string;
}

const CardInformation: FC<CardType> = ({ data, icon, title, type }) => {
  console.log(data);
  if (data[0] !== null) {
    return (
      <Card elevation={2} style={styles.generalInformation}>
        <Card.Title
          title={title}
          style={styles.cardTitle}
          right={() => <Avatar.Icon size={34} icon={icon} />}
        ></Card.Title>
        <Divider />
        <Card.Content>
          {type === 'simple' &&
            Object.entries(data).map(([key, value]) => {
              return (
                <SimpleInformation key={key} title={key} content={value} />
              );
            })}
          {type === 'list' &&
            data.map((d, i) => {
              return <ListInformation key={i} content={d} title={title} />;
            })}

          {/* {data.length !== 0 &&
            data.map((content: object, i) => {
              return <ListInformation content={content} title={title} key={i} />;
            })} */}
          {/* {type === 'dot' &&
            data.map((content: string) => {
              return <DotInformation content={content} />;
            })} */}
        </Card.Content>
      </Card>
    );
  }
  return null;
};

const styles = StyleSheet.create({
  generalInformation: {
    marginBottom: 20,
    paddingHorizontal: 14,
    paddingVertical: 2,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
  },
  cardTitle: {
    paddingRight: 8,
  },
});
export default CardInformation;
