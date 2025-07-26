const Contact = require('../models/Contact');

exports.addContact = async (req, res) => {
    try {
        const { name, email, phone, address, notes } = req.body;
        const contact = new Contact({
          user: req.user._id,
          name,
          email,
          phone,
          address,
          notes,
        });
        await contact.save();
        res.status(201).json({ message: 'contact added successful' });
    } catch (err) {
        console.error('adding contact error', err);
        res.status(401).json({ error: err.message });
    }
}

exports.getAllContacts = async (req, res) => {
    try {
        const contact = await Contact.find({user:req.user._id});
        if (contact.length === 0) return res.status(401).json({ error: 'Contact not found' });
        res.status(200).json({contact:contact})
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

exports.getContact = async (req, res) => {
    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact)
        return res.status(404).json({ error: "Contact not found" });
      res.status(200).json({ contact: contact });
    } catch (err) {
      console.error("Error fetching contact", err);
      res.status(500).json({ error: err.message });
    }
}

exports.updateContact = async (req, res) => {
    try {
        const contact = await Contact.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true });
        if (!contact) return res.status(404).json({ error: "Contact not found" });
        res.status(200).json({ message: "Contact updated successfully", contact: contact });
    }
    catch (err) {
        console.error("Error updating contact", err);
        res.status(500).json({ error: err.message });
    }
}

exports.deleteContact = async (req, res) => {
    try {
      const contact = await Contact.findByIdAndDelete(req.params.id);
      if (!contact) return res.status(404).json({ error: "Contact not found" });
      res.status(200).json({ message: "contact deleted sucessfully" });
    } catch (err) {
      console.error("Error deleting contact", err);
      res.status(500).json({ error: err.message });
    }
}
