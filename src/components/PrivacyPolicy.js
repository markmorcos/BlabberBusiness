import React from 'react';
import { ScrollView, Text } from 'react-native';

const PrivacyPolicy = () => {
  const { barStyle } = styles;
  return (
    <ScrollView contentStyle={barStyle}>
      <Text style={{ textAlign: 'justify', padding: 5, width: '100%', height: '100%' }}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque semper maximus bibendum. Donec congue erat metus, ac gravida risus ultrices commodo. Integer dignissim tellus elementum lacus facilisis, sollicitudin tristique massa viverra. Aliquam ut cursus ipsum. In finibus, dolor ut mollis tempus, purus ex malesuada tortor, non tincidunt lacus odio non velit. Interdum et malesuada fames ac ante ipsum primis in faucibus. In ornare velit eget condimentum facilisis.{"\n"}{"\n"}

        Phasellus sit amet purus cursus, vulputate lectus ut, hendrerit felis. Nam vitae nisl massa. Nullam bibendum, sem sit amet sollicitudin dictum, felis odio suscipit dui, id convallis justo risus id nunc. Morbi interdum lacus non tellus consequat, non gravida metus ornare. Donec consectetur diam eget quam condimentum porta. Maecenas quis turpis id orci eleifend tempus. Mauris sit amet dui ac elit dictum scelerisque. Curabitur lacus nisl, luctus eget libero vitae, blandit gravida nulla. Suspendisse potenti. Aliquam volutpat tristique libero. Nullam non ex id nulla imperdiet mattis. Nunc justo ex, cursus at posuere sed, interdum sed sapien. Nam id magna ultrices, laoreet leo vel, porta nulla. Donec eget euismod neque. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Proin eget neque mi.{"\n"}{"\n"}

        Cras ut est a sem euismod aliquam in vel ipsum. Mauris a ligula nibh. Nullam id sodales justo, ac consequat velit. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Nulla a nisi consequat, euismod dui ac, pellentesque ex. Quisque cursus efficitur velit, at accumsan nunc ullamcorper at. Pellentesque faucibus elementum nisi posuere dapibus.{"\n"}{"\n"}

        Suspendisse orci mi, cursus non mollis id, aliquet sed nisi. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eleifend ut lectus quis varius. Sed sodales nec est ut volutpat. Aliquam erat volutpat. Donec ut mattis tellus. Vestibulum faucibus, ante eget aliquam pretium, sapien ligula tristique enim, non pellentesque orci nunc sed leo. Sed vitae tempus nulla. Maecenas varius id justo non iaculis. Nam lacinia sodales placerat. Nunc lacinia, velit ut dignissim dignissim, diam neque volutpat lorem, vitae ullamcorper elit nunc nec elit. Mauris sit amet ligula nulla. Donec sagittis, enim eu facilisis porttitor, dui tellus gravida dui, sed elementum ante massa vitae nisl.{"\n"}{"\n"}

        Nullam eu dapibus est. Phasellus laoreet sagittis turpis ut aliquet. Integer nec nibh felis. Integer ultricies nibh in lobortis efficitur. Donec at est malesuada, lobortis metus sit amet, volutpat ex. Aliquam erat volutpat. Fusce egestas fringilla gravida. Praesent ante nulla, hendrerit quis egestas nec, convallis quis odio. Aenean in finibus mi. Sed varius libero fringilla nisi mattis volutpat. Cras placerat tellus at pulvinar eleifend. Aliquam erat volutpat. Proin bibendum metus at posuere ultrices. Phasellus vel semper mauris. In et massa et magna lacinia accumsan.
      </Text>
    </ScrollView>
  );
};

const styles = {
  barStyle: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'white',
    marginTop: 10,
    marginBottom: 5,
    marginLeft: 5,
    marginRight: 5
  }
};

export default PrivacyPolicy;
