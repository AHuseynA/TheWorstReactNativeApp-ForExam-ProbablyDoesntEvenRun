import {
  StyledView,
  StyledText,
  StyledTouchableOpacity,
} from '@common/StyledComponents';
import {useNavigation} from '@react-navigation/native';

const CustomHeader = ({title}) => {
  const navigation = useNavigation();
  const canGoBack = navigation.canGoBack();

  return (
    <StyledView
      className={`w-full flex-row bg-slate-500 items-center justify-center`}>
      <StyledTouchableOpacity
        disabled={!canGoBack}
        onPress={() => {
          navigation.goBack();
        }}
        className="absolute left-3 top-6.5">
        {canGoBack && (
          <StyledText className="text-white text-xs">{`<-- Go Back`}</StyledText>
        )}
      </StyledTouchableOpacity>

      <StyledText className="text-white font-poppi-medium text-[20px] pb-5 pt-6">
        {title}
      </StyledText>
    </StyledView>
  );
};

export default CustomHeader;
