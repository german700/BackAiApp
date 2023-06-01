const busboy = require("busboy");
const tf = require("@tensorflow/tfjs-node");
const coco_ssd = require("@tensorflow-models/coco-ssd");

let model = undefined;

(async () => {
  model = await coco_ssd.load({
    base: "mobilenet_v1",
  });
})();

exports.predict = (req, res) => {
  if (typeof model === "undefined") {
    res
      .status(500)
      .send({ error: true, message: "The model is still loading" });
    return;
  }
  const bb = busboy({ headers: req.headers });
  bb.on("file", (fieldname, file, filename, encoding, mimetype) => {
    const buffer = [];
    file.on("data", (data) => {
      buffer.push(data);
    });
    file.on("end", async () => {
      const image = tf.node.decodeImage(Buffer.concat(buffer));
      const predictions = await model.detect(image, 3, 0.25);
      console.log(predictions);
      res.json({ error: false, data: predictions });
    });
  });
  req.pipe(bb);
};
