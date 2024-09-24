import {
  StyledText,
  StyledView,
  StyledTouchableOpacity,
} from '@common/StyledComponents';
import {useNavigation} from '@react-navigation/native';

const InfoCard = ({cardItem}) => {
  const navigation = useNavigation();

  return (
    <StyledTouchableOpacity
      onPress={() => {
        navigation.navigate('DetailsPage', {item: cardItem});
      }}
      className="w-auto bg-white shadow shadow-zinc-300 rounded-lg my-2 p-4">
      <StyledText className="mb-2 text-lg font-semibold">
        {cardItem.name}
      </StyledText>
      <StyledText className="mb-2 font-light">{cardItem.email}</StyledText>
      <StyledText className="text-right text-zinc-400">
        {cardItem.company.name}
      </StyledText>
    </StyledTouchableOpacity>
  );
};

export default InfoCard;
