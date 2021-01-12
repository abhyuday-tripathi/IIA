Webcam.set({
  width: 350,
  height: 300,
  image_format: 'png',
  png_quality: 90,
});

Webcam.attach('#webcam-container');

const takeSnapshot = () => {
  Webcam.snap((data_uri) => {
    document.getElementById(
      'output'
    ).innerHTML = `<img src="${data_uri}" id="img" />`;
  });
};

console.log('ml 5 version :', ml5.version);

const modelLoaded = () => console.log('Model loaded');

const classifier = ml5.imageClassifier(
  'https://teachablemachine.withgoogle.com/models/eA8kqJSzw/model.json',
  modelLoaded
);

const gotResult = (error, results) => {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    document.querySelector('#obj').innerHTML = results[0].label;
    document.querySelector('#acc').innerHTML = results[0].confidence.toFixed(3);
  }
};

const check = () => {
  image = document.getElementById('img');
  classifier.classify(image, gotResult);
};
