import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import DriverDetailChips from '@/components/chips/DriverDetailChips';
import { areaMapping, typeMapping } from '@/constants/labelMappings';

describe('DriverDetailChips', () => {
  it('renders all values from typeMapping correctly', () => {
    const serviceTypes = Object.keys(typeMapping);

    render(<DriverDetailChips serviceType={serviceTypes} />);

    serviceTypes.forEach(type => {
      expect(screen.getByText(typeMapping[type])).toBeInTheDocument();
    });
  });

  it('renders all values from areaMapping correctly', () => {
    const availableAreas = Object.keys(areaMapping);

    render(<DriverDetailChips availableAreas={availableAreas} />);

    availableAreas.forEach(area => {
      expect(screen.getByText(areaMapping[area])).toBeInTheDocument();
    });
  });

  it('renders nothing when both serviceType and availableAreas are absent', () => {
    render(<DriverDetailChips />);

    expect(screen.queryByText(/service/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/area/i)).not.toBeInTheDocument();
  });
});

describe('DriverDetailChips - Invalid Values Test', () => {
  it('renders unknown serviceType values as they are', () => {
    const invalidServiceTypes = ['UNKNOWN_SERVICE', 'RANDOM_TYPE'];

    render(<DriverDetailChips serviceType={invalidServiceTypes} />);

    invalidServiceTypes.forEach(type => {
      expect(screen.getByText(type)).toBeInTheDocument();
    });
  });

  it('renders unknown availableAreas values as they are', () => {
    const invalidAreas = ['MARS', 'ATLANTIS'];

    render(<DriverDetailChips availableAreas={invalidAreas} />);

    invalidAreas.forEach(area => {
      expect(screen.getByText(area)).toBeInTheDocument();
    });
  });

  it('correctly renders a mix of valid and invalid values', () => {
    const mixedServiceTypes = ['HOME', 'UNKNOWN_SERVICE'];
    const mixedAreas = ['SEOUL', 'MARS'];

    render(<DriverDetailChips serviceType={mixedServiceTypes} availableAreas={mixedAreas} />);

    expect(screen.getByText(typeMapping['HOME'])).toBeInTheDocument();
    expect(screen.getByText(areaMapping['SEOUL'])).toBeInTheDocument();

    expect(screen.getByText('UNKNOWN_SERVICE')).toBeInTheDocument();
    expect(screen.getByText('MARS')).toBeInTheDocument();
  });
});
