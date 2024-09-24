import {useRoute} from '@react-navigation/native';
import {StyledText, StyledView} from '@common/StyledComponents';
import {useState, useEffect} from 'react';

const DetailsPage = () => {
  const [fetchedData, setFetchedData] = useState(null);
  const route = useRoute();
  const item = route.params?.item;
  const id = route.params?.id;

  const getItemData = async () => {
    const response = await fetch(
      `https://jsonplaceholder.typicode.com/users/${id}`,
    );

    const data = await response.json();

    response.ok && setFetchedData(data);
  };

  useEffect(() => {
    id && getItemData();
  }, [id]);

  return item ? (
    <StyledView className="px-4 py-5">
      <StyledView className="p-4 rounded-lg bg-white shadow shadow-zinc-300 mb-4">
        <StyledText className="font-bold text-lg mb-2">User info</StyledText>

        <StyledText>{item.name}</StyledText>
        <StyledText>{item.phone}</StyledText>
        <StyledText>{item.email}</StyledText>
        <StyledText>{item.website}</StyledText>
      </StyledView>

      <StyledView className="p-4 rounded-lg bg-white shadow shadow-zinc-300 mb-4">
        <StyledText className="font-bold text-lg mb-2">Adress</StyledText>

        <StyledText>{item.address.city}</StyledText>
        <StyledText>{item.address.street}</StyledText>
        <StyledText>{item.address.suite}</StyledText>
      </StyledView>

      <StyledView className="p-4 rounded-lg bg-white shadow shadow-zinc-300 mb-4">
        <StyledText className="font-bold text-lg mb-2">Company</StyledText>

        <StyledText>{item.company.name}</StyledText>
        <StyledText>{item.company.catchPhrase}</StyledText>
      </StyledView>
    </StyledView>
  ) : (
    <StyledText>{JSON.stringify(fetchedData)}</StyledText>
  );
};

export default DetailsPage;
