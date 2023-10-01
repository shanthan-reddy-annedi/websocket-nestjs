import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  isUUID,
} from 'class-validator';
import { ChatType } from 'src/utils/enum';

@ValidatorConstraint({ name: 'chatTypeAndIds', async: false })
export class ChatTypeAndIds implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const chat_type = args.object['chat_type'];
    const group_id = args.object['group_id'];
    const recipient_id = args.object['recipient_id'];

    if (
      (chat_type === ChatType.GROUP && !group_id) ||
      (chat_type === ChatType.ONE_ON_ONE && !recipient_id) ||
      (chat_type && group_id && recipient_id)
    ) {
      return false;
    }

    if (group_id && !isUUID(group_id)) {
      return false;
    }

    if (recipient_id && !isUUID(recipient_id)) {
      return false;
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const chat_type = args.object['chat_type'];
    const group_id = args.object['group_id'];
    const recipient_id = args.object['recipient_id'];

    if (chat_type === ChatType.GROUP && !group_id) {
      return 'A group chat must have a valid group_id.';
    } else if (chat_type === ChatType.ONE_ON_ONE && !recipient_id) {
      return 'A one-on-one chat must have a valid recipient_id.';
    } else if (chat_type === ChatType.GROUP && recipient_id) {
      return 'A recipient_id should not be provided for group chats.';
    } else if (chat_type === ChatType.ONE_ON_ONE && group_id) {
      return 'A group_id should not be provided for one-on-one chats.';
    } else if (!isUUID(group_id) || !isUUID(recipient_id)) {
      return 'Invalid UUID format for group_id or recipient_id.';
    }

    return 'Validation failed: The combination of chat_type and IDs is invalid.';
  }
}

@ValidatorConstraint({ name: 'enumPropertyValidator', async: false })
export class EnumPropertyValidator implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const propertyToCheck = args.object[args.constraints[0]] as string;
    const expectedValue = args.constraints[1] as string;
    const propertiesToRequire = args.constraints[2] as string;
    const propertiesToForbid = args.constraints.slice(3) as string[];

    if (propertyToCheck === expectedValue) {
      if (!args.object[propertiesToRequire]) {
        return false;
      }
      for (const prop of propertiesToForbid) {
        if (args.object[prop]) {
          return false;
        }
      }
    }

    return true;
  }

  defaultMessage(args: ValidationArguments) {
    const propertyToCheck = args.object[args.constraints[0]] as string;
    const expectedValue = args.constraints[1] as string;
    const propertyName = args.property;
    const propertiesToRequire = args.constraints[2] as string;
    const propertiesToForbid = args.constraints.slice(3) as string[];

    if (propertyToCheck === expectedValue && !propertiesToRequire) {
      return `Property '${propertyName}' is ${expectedValue} then ${propertiesToRequire} is required`;
    }
    if (propertiesToForbid) {
      return `if ${args.constraints[0]} is ${expectedValue} then ${propertiesToForbid} should not be present`;
    }
    return '';
  }
}
