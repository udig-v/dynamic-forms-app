const Form = require("../models/form");
const Response = require("../models/response");
const generateShareLink = require("../util/shareLink");

const getForms = (req, res) => {
  const userId = req.user._id;
  console.log(userId);

  Form.find({ user: userId })
    .select("title description _id")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        forms: docs.map((doc) => {
          return {
            title: doc.title,
            description: doc.description,
            _id: doc._id,
            request: {
              type: "GET",
              URL: "http://localhost:5000/api/forms/" + doc._id,
            },
          };
        }),
      };
      res.status(200).json(response);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};

const addForm = async (req, res) => {
  try {
    const { title, description, fields } = req.body;
    const userId = req.user._id;

    const form = new Form({
      title,
      description,
      user: userId,
      fields,
    });

    const savedForm = await form.save();
    res.status(201).json({ msg: "Form added successfully" });
  } catch (err) {
    console.error("Error adding form:", err);
    res.status(500).json({ error: "Unable to add this form", err });
  }
};

const getForm = (req, res) => {
  const id = req.params.formId;
  Form.findById(id)
    .then((form) => {
      res.status(200).json({ form });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};

const deleteForm = (req, res) => {
  Form.findByIdAndDelete(req.params.formId)
    .then((form) => {
      if (!form) {
        return res.status(404).json({
          error: "No such form exists in the database",
        });
      }
      res.status(200).json({
        message: "Form deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: "Internal server error" + err,
      });
    });
};

const editForm = (req, res) => {
  const updatedFields = req.body;
  Form.findByIdAndUpdate(req.params.formId, updatedFields, { new: true })
    .then((form) => {
      if (!form) {
        return res.status(404).json({ error: "Form not found" });
      }
      res.json({ msg: "Updated successfully", form });
    })
    .catch((err) =>
      res.status(400).json({ error: "Unable to update the Database" })
    );
};

const postResponses = async (req, res) => {
  try {
    const formId = req.params.formId;
    const { responses } = req.body;

    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    const newResponse = new Response({
      form: formId,
      responses,
    });
    await newResponse.save();

    res.status(201).json({ msg: "Response submitted successfully" });
  } catch (err) {
    console.error("Error saving responses:", err);
    res.status(500).json({ error: "Unable to submit this response", err });
  }
};

const getResponses = async (req, res) => {
  try {
    const formId = req.params.formId;

    const form = await Form.findById(formId);
    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    const responses = await Response.find({ form: formId });

    const responseData = {
      form: {
        _id: form._id,
        title: form.title,
        description: form.description,
        fields: form.fields,
      },
      responses: responses.map((response) => ({
        _id: response._id,
        responses: response.responses,
      })),
    };

    res.status(200).json(responseData);
  } catch (err) {
    console.error("Error fetching form responses:", err);
    res.status(500).json({ error: "Unable to fetch form responses", err });
  }
};

const postShareLink = async (req, res) => {
  const { formId } = req.body;

  try {
    const form = await Form.findById(formId);

    if (!form) {
      return res.status(404).json({ error: "Form not found" });
    }

    if (form.shareableLink) {
      return res.json({ shareableLink: form.shareableLink });
    }

    const shareableLink = await generateShareLink();

    form.shareableLink = shareableLink;
    await form.save();

    res.json({ shareableLink });
  } catch (err) {
    console.error("Error generating shareable link:", err);
    res
      .status(500)
      .json({ error: "Unable to generate a shareable link:", err });
  }
};

const getSharedForm = async (req, res) => {
  const { shareableLink } = req.params;

  try {
    console.log(shareableLink);
    const form = await Form.findOne({ shareableLink });
    if (!form) {
      return res.status(404).json({ error: "Shared form not found" });
    }
    res.status(200).json({ form });
  } catch (err) {
    console.error("Error fetching shareable link:", err);
    res.status(500).json({ error: "Unable to fetch the shared form:", err });
  }
};

module.exports = {
  getForms,
  getForm,
  deleteForm,
  addForm,
  editForm,
  getResponses,
  postResponses,
  postShareLink,
  getSharedForm,
};
