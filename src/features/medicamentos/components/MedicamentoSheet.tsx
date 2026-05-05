import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/shared/components/ui/sheet"


export const MedicamentoSheet = () => {
    return(
        <Sheet>
        <SheetTrigger>Open</SheetTrigger>
        <SheetContent>
            <SheetHeader>
            <SheetTitle>Are you absolutely sure?</SheetTitle>
            <SheetDescription>This action cannot be undone.</SheetDescription>
            </SheetHeader>
        </SheetContent>
        </Sheet>
    );
};
