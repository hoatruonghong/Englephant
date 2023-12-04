import React from 'react';
import {Text, View, StyleSheet, ImageBackground, TouchableOpacity} from 'react-native';
import colors from './../../assets/colors';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';

const numofcardspermap = 9;

function renderCollection(flashcards) {
  // console.log('========key==========');
  while (flashcards.length!=numofcardspermap){
    flashcards.push({status: "Empty"});
  }
  const numRow = numofcardspermap/3;
  var count = 0;
  var listRow = [];
  for (let i = 0; i < numRow; i++) {
    listRow.push(renderRow(flashcards.slice(count, count + 3), i));
    count += 3;
  }
  return listRow;
}

function renderRow(flashcards, rowId) {
  return (
    <View style={styles.row} key={rowId}>
      {flashcards.map((flashcard, index) => {
        return renderFlashcard(flashcard, index, rowId * 3 + index);
      })}
    </View>
  );
}

function renderFlashcard(flashcard, position, id) {
  var customStyle = styles.image1;
  switch (position) {
    case 1:
      customStyle = styles.image2;
      break;
    case 2:
      customStyle = styles.image3;
      break;
  }
  return (
    <TouchableOpacity
      style={[styles.imageWrap, customStyle, {backgroundColor: flashcard.status == "Empty" ? colors.bright_gray_brown : colors.white, 
      overflow: "hidden"}]}
      key={id}
      onPress={() => {
        console.log(flashcard._id, 'id');
      }}>
      {flashcard.status != "Empty" ? (
        <ImageBackground
          source={{uri: flashcard.img}}
          style={styles.image}
        />
      ) : (
        <FontAwesomeIcon
          icon="fa-solid fa-question"
          size={80}
          color={colors.shadow_gray_brown}
        />
      )}
    </TouchableOpacity>
  );
}

export default function Collection(props) {
  const {item} = props;
  const flashcards = item.flashcards;

  return (
    <View style={styles.archiveWrap}>
      <Text style={styles.titleText}>{item.map}</Text>
      <View style={styles.imagesWrap}>{renderCollection(flashcards)}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  archiveWrap: {
    backgroundColor: colors.shadow_gray_brown,
    borderRadius: 20,
    marginBottom: '5%',
  },
  imagesWrap: {
    backgroundColor: colors.bright_gray_brown,
    borderRadius: 16,
    borderColor: colors.shadow_gray_brown,
    borderWidth: 3,
    padding: '4%',
    paddingBottom: 0,
  },
  row: {
    flexDirection: 'row',
    marginBottom: '4%',
  },
  imageWrap: {
    width: '30%',
    height: 100,
    borderRadius: 16,
    borderColor: colors.shadow_gray_brown,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    resizeMode: 'stretch',
    width: '100%',
    aspectRatio: 1,
    alignSelf: "center",
  },
  image1: {},
  image2: {
    marginLeft: '5%',
  },
  image3: {
    marginLeft: '5%',
  },
  titleText: {
    fontSize: 18,
    fontWeight: 'medium',
    color: colors.white,
    paddingLeft: '10%',
    paddingTop: '3%',
    paddingBottom: '1%',
  },
});
