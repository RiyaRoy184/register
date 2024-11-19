import { useState } from 'react';
import image from './assets/girl.png';
import './App.css';
import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  InputLabel,
  MenuItem,
  Select,
} from '@mui/material';

function App() {
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const initialFormData = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: 'female',
    course: '',
    address: '',
  };
  const [formData, setFormData] = useState(initialFormData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Valid email is required';
    if (!formData.phone.trim() || !/^\d{10}$/.test(formData.phone))
      newErrors.phone = 'Phone number must be 10 digits';
    if (!formData.dateOfBirth) newErrors.dateOfBirth = 'Date of Birth is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.course) newErrors.course = 'Please select a course';
    return newErrors;
  };

  const handleSubmit = () => {
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    alert(
      `Data stored successfully! \n\n` +
        `First Name: ${formData.firstName}\n` +
        `Address: ${formData.address}\n` +
        `Email: ${formData.email}\n` +
        `Phone: ${formData.phone}\n` +
        `Gender: ${formData.gender}\n` +
        `Course: ${formData.course}\n` +
        `Date of Birth: ${formData.dateOfBirth}`
    );
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setFormData(initialFormData);
  };

  return (
    <div className="student bg-color:info">
      <div style={{ width: '100%', minHeight: '100vh' }} className="d-flex justify-content-center">
        <div style={{ width: '800px', height: '800px',background: "linear-gradient(to right, #ff7e5f, #feb47b)" }} className="rounded ps-4 pt-2">
          <u><h2 className="text-dark text-center">STUDENT REGISTRATION FORM</h2></u>
          <div className="row">
            <div className="col-lg-6">
              <h6>NAME</h6>
              <TextField
                fullWidth
                variant="outlined"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                error={!!errors.firstName}
                helperText={errors.firstName}
              />

              <h6 className="mt-2">DATE OF BIRTH</h6>
              <TextField
                fullWidth
                type="date"
                variant="outlined"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                error={!!errors.dateOfBirth}
                helperText={errors.dateOfBirth}
              />

              <h6 className="mt-2">ADDRESS</h6>
              <TextField
                fullWidth
                variant="outlined"
                name="address"
                id="outlined-multiline-flexible"
                multiline
                maxRows={4}
                value={formData.address}
                onChange={handleChange}
                error={!!errors.address}
                helperText={errors.address}
              />

              <h6 className="mt-2">EMAIL</h6>
              <TextField
                fullWidth
                type="email"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
              />

              <h6 className="mt-2">PHONE</h6>
              <TextField
                fullWidth
                type="tel"
                variant="outlined"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                error={!!errors.phone}
                helperText={errors.phone}
              />

              <FormControl fullWidth className="mt-2">
                <h6 className="mt-2">COURSE</h6>
                <Select
                  name="course"
                  value={formData.course}
                  onChange={handleChange}
                  error={!!errors.course}
                >
                  <MenuItem value="Mathematics">Mathematics</MenuItem>
                  <MenuItem value="Science">Science</MenuItem>
                  <MenuItem value="History">History</MenuItem>
                  <MenuItem value="Literature">Literature</MenuItem>
                </Select>
                {errors.course && <p style={{ color: 'red', fontSize: '12px' }}>{errors.course}</p>}
              </FormControl>

              <FormControl>
                <FormLabel className="mt-3" id="demo-radio-buttons-group-label">Gender</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                >
                  <div className="d-flex">
                    <FormControlLabel value="female" control={<Radio />} label="Female" />
                    <FormControlLabel value="male" control={<Radio />} label="Male" />
                  </div>
                </RadioGroup>
              </FormControl>

              <div className="d-flex mt-4">
                <Button
                  style={{ backgroundColor: 'brown', marginRight: '10px' }}
                  className="text-light"
                  variant="contained"
                  onClick={handleSubmit}
                >
                  REGISTER
                </Button>
                <Button
                  style={{ backgroundColor: 'grey' }}
                  className="text-light"
                  variant="contained"
                  onClick={handleClose}
                >
                  CANCEL
                </Button>
              </div>
            </div>
            <div className="col-lg-6">
              <img src={image} alt="Student Registration" style={{ width: '100%', height: '630px' }} />
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Registration Details</DialogTitle>
        <DialogContent>
          <p><strong>First Name:</strong> {formData.firstName}</p>
          <p><strong>Address:</strong> {formData.address}</p>
          <p><strong>Email:</strong> {formData.email}</p>
          <p><strong>Phone:</strong> {formData.phone}</p>
          <p><strong>Gender:</strong> {formData.gender}</p>
          <p><strong>Course:</strong> {formData.course}</p>
          <p><strong>Date of Birth:</strong> {formData.dateOfBirth}</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default App;