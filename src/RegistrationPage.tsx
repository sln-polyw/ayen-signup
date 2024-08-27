import React, { useState } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Checkbox,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
} from '@nextui-org/react';
import { Tooltip } from '@nextui-org/react';

const RegistrationPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDob] = useState('');
  const [location, setLocation] = useState('');
  const [gender, setPronouns] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateForm = () => {
    let isValid = true;
    const newErrors: { [key: string]: string } = {};

    if (name.length === 0 || name.length > 50) {
      newErrors.name = 'Name must be between 1 and 50 characters';
      isValid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }

    if (!dob) {
      newErrors.dob = 'Date of Birth is required';
      isValid = false;
    } else {
      const dobDate = new Date(dob);
      const today = new Date();
      const minDate = new Date('1901-01-01');
      const age = today.getFullYear() - dobDate.getFullYear();
      if (dobDate > today || dobDate < minDate || age < 18) {
        newErrors.dob = 'You must be over 18 and born after 1901';
        isValid = false;
      }
    }

    if (location.length === 0) {
      newErrors.location = 'Location is required';
      isValid = false;
    }

    if (!pronouns) {
      newErrors.gender = 'Pronouns are required';
      isValid = false;
    }

    if (!termsAccepted) {
      newErrors.terms = 'You must accept the terms and conditions';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsLoading(true);
      try {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setShowModal(true);
      } catch (error) {
        console.error('Registration failed:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <Card>
        <CardHeader className="flex gap-3">
          <div className="flex flex-col">
            <p className="text-md">Ayen Early Access Registration</p>
          </div>
        </CardHeader>
        <CardBody>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Name"
              placeholder="Enter your name"
              value={name}
              onValueChange={setName}
              errorMessage={errors.name}
              isInvalid={!!errors.name}
            />
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onValueChange={setEmail}
              errorMessage={errors.email}
              isInvalid={!!errors.email}
            />
            <Input
              label="Date of Birth"
              type="date"
              placeholder="Select your date of birth"
              value={dob}
              onValueChange={setDob}
              errorMessage={errors.dob}
              isInvalid={!!errors.dob}
            />
            <Input
              label="Location"
              placeholder="Enter your city or country"
              value={location}
              onValueChange={setLocation}
              errorMessage={errors.location}
              isInvalid={!!errors.location}
            />
            <Select
              label="Gender"
              placeholder="Select your gender"
              selectedKeys={gender ? [gender] : []}
              onSelectionChange={(keys) => setGender(Array.from(keys)[0] as string)}
              errorMessage={errors.gender}
              isInvalid={!!errors.gender}
            >
              <SelectItem key="male" value="male">Male</SelectItem>
              <SelectItem key="female" value="female">Female</SelectItem>
              <SelectItem key="nonbinary" value="nonbinary">Non binary</SelectItem>
              <SelectItem key="other" value="other">Prefer not to say</SelectItem>
            </Select>
            <Tooltip content="I accept the Terms of Service and Privacy Policy">
              <Checkbox
                isSelected={termsAccepted}
                onValueChange={setTermsAccepted}
              >
                <span className="text-sm">
                  I accept the{' '}
                  <a href="/terms" target="_blank" rel="noopener noreferrer" className="text-primary">
                    Terms of Service
                  </a>
                  ,{' '}
                  <a href="/privacy" target="_blank" rel="noopener noreferrer" className="text-primary">
                    Privacy Policy
                  </a>
                  , and confirm that I am over 18 years old.
                </span>
              </Checkbox>
            </Tooltip>
            {errors.terms && <p className="text-danger text-sm">{errors.terms}</p>}
            <Button
              type="submit"
              isDisabled={!termsAccepted || isLoading}
              color="primary"
              className="w-full"
            >
              {isLoading ? 'Registering...' : 'Register'}
            </Button>
          </form>
        </CardBody>
      </Card>

      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Registration Successful</ModalHeader>
          <ModalBody>
            <p>
              Thank you for registering! Please check your email (including spam
              folder) for further instructions.
            </p>
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onPress={() => setShowModal(false)}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default RegistrationPage;