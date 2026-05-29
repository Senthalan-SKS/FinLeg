package com.finled.modules.accounting.journal.validation;

import com.finled.common.exception.BadRequestException;
import com.finled.modules.accounting.journal.dto.CreateJournalLineRequest;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JournalValidationService {

    public void validateJournalLines(
            List<CreateJournalLineRequest> lines
    ) {

        double totalDebit = 0;
        double totalCredit = 0;

        for (CreateJournalLineRequest line : lines) {

            double debit = line.getDebitAmount() == null
                    ? 0
                    : line.getDebitAmount();

            double credit = line.getCreditAmount() == null
                    ? 0
                    : line.getCreditAmount();

            if (debit < 0 || credit < 0) {
                throw new BadRequestException(
                        "Amounts cannot be negative"
                );
            }

            if (debit > 0 && credit > 0) {
                throw new BadRequestException(
                        "Line cannot contain both debit and credit"
                );
            }

            if (debit == 0 && credit == 0) {
                throw new BadRequestException(
                        "Line must contain debit or credit"
                );
            }

            totalDebit += debit;
            totalCredit += credit;
        }

        if (Math.abs(totalDebit - totalCredit) > 0.001) {
            throw new BadRequestException(
                    "Journal entry is not balanced"
            );
        }
    }
}